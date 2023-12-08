
import sys
old_stdout = sys.stdout
log_file = open("output.txt", "w")
sys.stdout = log_file
print("Hello World!")
sys.stdout = old_stdout
log_file.close()
    