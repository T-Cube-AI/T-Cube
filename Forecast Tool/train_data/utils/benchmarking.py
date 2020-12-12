import requests
import pandas as pd
import csv

path = "/home/acer/Downloads/Raakhal_personal/hackathon/modelling/benchmarking_ap.csv"

df = pd.read_csv(path)

data = []
for i in range(len(df)):
    date = df['Date'][i]
    data.append(date)
    print(data)

url = 'http://127.0.0.1:8000/get_data/'

file = open('russia.csv', 'w', newline='')

with file:
    header = ['date', 'pred_conf_1', 'pred_active_1', 'pred_dec_1', 'pred_conf_7', 'pred_active_7', 'pred_dec_7',
              'pred_conf_14', 'pred_active_14', 'pred_dec_14', 'pred_conf_21', 'pred_active_21', 'pred_dec_21']
    writer = csv.DictWriter(file, fieldnames=header)
    writer.writeheader()

    for i in range(19, len(data)):
        date = data[i]
        print(date)
        params = {'date': str(date),
                  'region': "russia",
                  'country': "russia"}
        result = requests.post(url, params)
        response = result.json()
        print(response)
        if response['data'] is not None:
            if len(response["data"]) > 1:
                pred_conf_1 = response["data"]["predictions"][0]["confirmed"]
                pred_active_1 = response["data"]["predictions"][0]["active"]
                pred_dec_1 = response["data"]["predictions"][0]["deaths"]
                pred_conf_7 = response["data"]["predictions"][6]["confirmed"]
                pred_active_7 = response["data"]["predictions"][6]["active"]
                pred_dec_7 = response["data"]["predictions"][6]["deaths"]
                pred_conf_14 = response["data"]["predictions"][13]["confirmed"]
                pred_active_14 = response["data"]["predictions"][13]["active"]
                pred_dec_14 = response["data"]["predictions"][13]["deaths"]
                pred_conf_21 = response["data"]["predictions"][20]["confirmed"]
                pred_active_21 = response["data"]["predictions"][20]["active"]
                pred_dec_21 = response["data"]["predictions"][20]["deaths"]
                writer.writerow({'date': str(date),
                                 'pred_conf_1': str(pred_conf_1),
                                 'pred_active_1': str(pred_active_1),
                                 'pred_dec_1': str(pred_dec_1),
                                 'pred_conf_7': str(pred_conf_7),
                                 'pred_active_7': str(pred_active_7),
                                 'pred_dec_7': str(pred_dec_7),
                                 'pred_conf_14': str(pred_conf_14),
                                 'pred_active_14': str(pred_active_14),
                                 'pred_dec_14': str(pred_dec_14),
                                 'pred_conf_21': str(pred_conf_21),
                                 'pred_active_21': str(pred_active_21),
                                 'pred_dec_21': str(pred_dec_21)})
            else:
                print("no data for this date" + str(date))

            # pred_deceased
            # print(i)
            # f.write("%s,%s,%s\n" % (str(date), pred_date, pred_active))
