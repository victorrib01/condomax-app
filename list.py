
import os

def list_files_and_folders(directory, indentation=0, ignore_list=[]):
    """
    List all files and folders in the specified directory recursively, ignoring names in the ignore_list.

    Parameters:
    - directory: The directory path to start from
    - indentation: Current indentation level for printing
    - ignore_list: List of file or folder names to ignore
    """
    # Lista todos os arquivos e pastas no diretório especificado
    for filename in os.listdir(directory):
        if filename not in ignore_list:
            print("  " * indentation + filename)
            filepath = os.path.join(directory, filename)
            if os.path.isdir(filepath):
                list_files_and_folders(filepath, indentation + 1, ignore_list)

if __name__ == '__main__':
    # Lista de arquivos ou pastas para ignorar
    ignore_list = ["node_modules", ".expo", ".git"]


    # Pega o diretório atual
    current_directory = os.getcwd()

    list_files_and_folders(current_directory, ignore_list=ignore_list)
