import traceback
from train_data.utils.json_data import json_data, us_data, russia_data
from train_data.utils.resultant_data import resultant_data_india, resultant_data_us, resultant_data_russia


def service_result(place, end_date, country):
    try:
        path = "/home/opc/World-Wide-API/Datasets/"
        if country == "india":
            path = path + "India/"
            result_out = resultant_data_india(path, place, end_date, json_data)
            return result_out
        if country == "us":
            path = path + "US/"
            result_out = resultant_data_us(path, place, end_date, us_data)
            return result_out

        if country == "russia":
            path = path + "Russia/"
            result_out = resultant_data_russia(path, place, end_date, russia_data)
            return result_out

    except Exception as e:
        traceback.format_exc()
        output = {"message": "Exception occurred in services.py  " + str(e)}
        return output
