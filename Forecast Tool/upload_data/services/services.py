# import traceback
from upload_data.utils.Model_21 import SEIRD


def service_result(uploaded_data, population):
    model = SEIRD(filename=uploaded_data, population=population)
    resultant_data = model.final_run()
    return resultant_data
