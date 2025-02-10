import csv
import json

csv_file_path = '/Users/shubham/Desktop/frontend/Apple Music - unique_tracks.csv'
json_file_path = '/Users/shubham/Desktop/frontend/unique_tracks.json'

# Read the CSV and add data to a dictionary
data = []
with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data.append(row)

# Write the data to a JSON file
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=4)

print(f"CSV data has been successfully converted to JSON and saved to {json_file_path}")