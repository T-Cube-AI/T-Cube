import os
from glob import glob
from train_data.utils.model_pred import SEIRD
# from train_data.utils.json_data import json_data
import traceback
import datetime
import pandas as pd


def get_days(start_date, end_date):
    sy, sm, sd = start_date.split('-')
    ey, em, ed = end_date.split('-')
    today = datetime.date(int(sy), int(sm), int(sd))
    someday = datetime.date(int(ey), int(em), int(ed))
    diff = someday - today
    days = diff.days
    return days


def model_predict(end_date, file_path, N, place):
    end_date = end_date
    df = pd.read_csv(file_path, header=0)
    print(end_date)
    if len(df) > 0:
        start_date = df['Date'].iloc[0]
        start_date = start_date.replace(" ", '')
        days = get_days(start_date, end_date)
        print(days)
        if days > 18:
            print("raakhal")
            model = SEIRD(file_path, N, place, str(end_date))
            output = model.final_run()
            return output
        else:
            output = {"message": "end_date referenced before the start data of cases in this region, make sure there "
                                 "is minimum 18 days from start_date " + str(start_date) + "for training, provide a "
                                                                                           "later end_date "}
            return output

    else:
        output = {"message": "Data not found for this region"}
        return output


def resultant_data_india(folder_path, place, end_date, json_data):
    try:
        if place.lower() == "india":
            N = 1314000000
            file_path = folder_path + "Total.csv"
            output = model_predict(end_date, file_path, N, place.lower())
            return output
        # folder_path = folder_path + "India/"
        for folder in os.listdir(folder_path):
            full_path = os.path.join(folder_path, folder)
            for files in glob(full_path + '/*.csv'):
                # file_name = os.path.splitext(os.path.basename(files))[0]
                base = os.path.basename(files)
                district = base[:-4]
                parent = os.path.dirname(files)
                state = os.path.basename(parent)
                place = place.lower()
                state1 = state.replace("-", " ")
                state2 = state.lower()
                if district == "total" and place == state2:
                    print(state2, "----entered_state")
                    N = json_data[state1]["totalPopulation"]
                    path = str(files)
                    # model = SEIRD(path, N, str(state), str(end_date))
                    # output = model.final_run()
                    output = model_predict(end_date, path, N, str(state))
                    return output
                if district.lower() == place:
                    print(place, "----entered_district")
                    state1 = state1
                    field_data = json_data[state1]
                    for i in range(len(field_data["districts"])):
                        dict_place = json_data[state1]["districts"][i]["districtName"]
                        dict_place1 = dict_place.lower()
                        if place == dict_place1:
                            path = str(files)
                            # print(files, state1, dict_place, dict_place1)
                            N = json_data[state1]["districts"][i]["population"]
                            # model = SEIRD(path, N, str(state), str(end_date))
                            # output = model.final_run()
                            output = model_predict(end_date, path, N, str(state))
                            return output
    except Exception as e:
        traceback.format_exc()
        output = {"message": "Exception occurred in resultant_data.py  " + str(e)}
        return output


def resultant_data_us(folder_path, place, end_date, json_data):
    try:
        if place.lower() == "us":
            N = 329340000
            file_path = folder_path + "Total.csv"
            output = model_predict(end_date, file_path, N, place.lower())
            return output
        for files in glob(folder_path + '/*.csv'):
            base = os.path.basename(files)
            district = base[:-4]
            place = place.lower()
            district1 = district.replace("-", " ")
            district2 = district.lower()
            # print(district2,district,district1, place)
            if district2 == place:
                print(district2, files, place)
                for i in range(len(json_data)):
                    state = json_data[i]['State']
                    print(state, district1)
                    if state == district1:
                        print(state, district, place)
                        path = str(files)
                        # state1 = state.lower()
                        # state2 = state.replace(" ", "-")
                        N = json_data[i]['Pop']
                        print(N)
                        output = model_predict(end_date, path, N, str(state))
                        return output
    except Exception as e:
        traceback.format_exc()
        output = {"message": "Exception occurred in resultant_data_us  " + str(e)}
        return output


def resultant_data_russia(folder_path, place, end_date, json_data):
    try:
        if place.lower() == "russia":
            N = 176748590
            file_path = folder_path + "Total.csv"
            output = model_predict(end_date, file_path, N, place.lower())
            return output
            # N = 329340000
            # file_path = folder_path + "Total.csv"
            # output = model_predict(end_date, file_path, N, place.lower())
            # return output
        for files in glob(folder_path + '/*.csv'):
            base = os.path.basename(files)
            district = base[:-4]
            place = place.lower()
            district1 = district.replace("-", " ")
            district2 = district.lower()
            district3 = district1.lower()
            if district2 == place:
                print(district2, place, files)
                for i in range(len(json_data)):
                    state = json_data[i]['Region_eng']
                    state = state.lower()
                    print(state,district3)
                    if state == district3:
                        N = json_data[i]['Population']
                        N = int(N)
                        path = str(files)
                        print(end_date, path, N, str(state))
                        output = model_predict(end_date, path, N, str(state))
                        return output
    except Exception as e:
        traceback.format_exc()
        output = {"message": "Exception occurred in resultant_data_russia  " + str(e)}
        return output
