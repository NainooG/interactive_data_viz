from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import geopandas as gpd
import requests
from io import StringIO
import os
import uvicorn

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def custom_bivariate_classification(x, y):
    if pd.isna(x) or pd.isna(y):
        return None

    # Custom thresholds for People_of_Color
    if x <= 20:
        x_class = 1
    elif x <= 40:
        x_class = 2
    else:
        x_class = 3

    # Custom thresholds for Access_Healthy_Foods
    if y <= 80:
        y_class = 1
    elif y <= 90:
        y_class = 2
    else:
        y_class = 3

    return f"{x_class}{y_class}"

def get_geojson_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, 'csv_files', 'Limited_Access_to_Healthy_Food.csv')
    food_desert = pd.read_csv(csv_path, dtype={"Census Tract": str})
    food_desert = food_desert[pd.to_numeric(food_desert['Census Tract'], errors='coerce').notnull()]
    food_desert['Census Tract'] = food_desert['Census Tract'].astype(float)

    url = "https://services8.arcgis.com/rGGrs6HCnw87OFOT/arcgis/rest/services/People_of_Color_v2/FeatureServer/0/query"
    params = {
        'outFields': '*',
        'where': '1=1',
        'f': 'geojson'
    }
    response = requests.get(url, params=params)
    census_tracts = gpd.read_file(StringIO(response.text))
    census_tracts['Census_Tract'] = census_tracts['Census_Tract'].astype(float)

    joined_data = census_tracts.merge(food_desert, left_on='Census_Tract', right_on='Census Tract')
    joined_data = joined_data.dropna(subset=['Score-Limited Access to Healthy Food Retailers', 'Percent_People_of_Color'])

    joined_data['People_of_Color'] = pd.to_numeric(joined_data['Percent_People_of_Color'], errors='coerce')
    joined_data['Access_Healthy_Foods'] = pd.to_numeric(joined_data['Score-Limited Access to Healthy Food Retailers'], errors='coerce')

    # Create the bi_class column using the custom classification function
    joined_data['bi_class'] = joined_data.apply(
        lambda row: custom_bivariate_classification(row['People_of_Color'], row['Access_Healthy_Foods']), axis=1
    )

    bivariate_colors = {
        '33': '#3b4994', '32': '#8c62aa', '31': '#be64ac',
        '23': '#5698b9', '22': '#a5add3', '21': '#dfb0d6',
        '13': '#5ac8c8', '12': '#ace4e4', '11': '#e8e8e8',
    }

    # Map the bi_class column to the corresponding colors
    joined_data['color'] = joined_data['bi_class'].map(bivariate_colors)

    # Convert GeoDataFrame to a valid GeoJSON format
    geojson = joined_data.to_json()

    return geojson

@app.get("/api/map-data")
async def map_data():
    data = get_geojson_data()
    
    return data

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
