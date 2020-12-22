import os
import shutil
from django.core.files.storage import default_storage


def deleteFolder(folder_name):
    if os.path.exists(folder_name):
        shutil.rmtree(folder_name)


def createFolder(folder_name):
    if not os.path.exists(folder_name):
        os.makedirs(folder_name, 0o775)


def saveFileWithTimestamp(file, origin_path):
    if file:
        path = default_storage.save(file.name, file)
        print(path)
        save_path = origin_path + '/' + file.name
        return save_path
