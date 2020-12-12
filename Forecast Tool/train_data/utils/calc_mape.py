# import numpy as np
import json
import traceback


def MAPE(actual, predicted):
    mape = 0
    # total_true = 0
    samples = len(actual)
    for i in range(samples):
        true = actual[i]
        # total_true += true
        pred = predicted[i]

        if true == 0:
            mape_s = 0
        else:
            mape_s = (abs(true - pred) / true)
            # mape_s = abs(true - pred)  #mae
            # print("mape_s", mape_s)

        mape += mape_s

    mape = mape * 100

    return mape / samples


def mape_table(filename, field):
    try:
        # print(filename['actual_data'])
        # with open(filename) as json_file:
        #     Data = json.load(json_file)
        # print(Data)

        actual_length = len(filename['actual_data'])
        pred_length = len(filename["predictions"])
        print(actual_length, pred_length, "raakhal")

        actual_d = []
        pred_d = []

        for i in range(actual_length):
            # print(i)
            for j in range(pred_length):
                # print(filename["actual_data"][i]['date'], "-----")
                actual_date = str(filename["actual_data"][i]['date'])
                pred_date = str(filename["predictions"][j]['date'])
                actual_date = actual_date.replace(' ', '')
                pred_date = pred_date.replace(' ', '')
                if actual_date == pred_date:
                    # print("raakhal_21")
                    actual_d.append(filename["actual_data"][i][field])
                    pred_d.append(filename["predictions"][j][field])

        # print(len(actual_d), actual_d)
        # print(len(pred_d), pred_d)

        if len(pred_d) >= 7:
            mape_7 = MAPE(actual_d[:7], pred_d[:7])
        else:
            mape_7 = None

        if len(pred_d) >= 14:
            mape_14 = MAPE(actual_d[:14], pred_d[:14])
        else:
            mape_14 = None

        if len(pred_d) == 21:
            mape_21 = MAPE(actual_d, pred_d)
        else:
            mape_21 = None

        mape_list = [mape_7, mape_14, mape_21]
        # mape_list = np.around(mape_list, decimals=2)
        # print(mape_list)

        return mape_list
    except Exception as e:
        traceback.format_exc()
        output = {"message": "Exception occurred in calc_MAPE.py  " + str(e)}
        print(output, "raaaaaaaaarrara")
        return output
