
import sys
old_stdout = sys.stdout
log_file = open("message.txt","w")
sys.stdout = log_file
for i in range(6):
    print(i)
sys.stdout = old_stdout
log_file.close()
    