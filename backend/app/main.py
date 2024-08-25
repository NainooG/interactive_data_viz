from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import geopandas as gpd
import requests
from io import StringIO
import os

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    bivariate_colors = {
        '33': '#3b4994', '32': '#8c62aa', '31': '#be64ac',
        '23': '#5698b9', '22': '#a5add3', '21': '#dfb0d6',
        '13': '#5ac8c8', '12': '#ace4e4', '11': '#e8e8e8',
    }

    joined_data['color'] = joined_data['bi_class'].map(bivariate_colors)
    return joined_data.to_json()

@app.get("/api/map-data")
async def map_data():
    data = get_geojson_data()
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
