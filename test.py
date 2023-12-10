
import sys
old_stdout = sys.stdout
log_file = open("message.txt", "w+")
sys.stdout = log_file
print("Hello World!")

dhajdhasido
sys.stdout = old_stdout
log_file.close()
    