
import sys
old_stdout = sys.stdout
log_file = open("message.txt", "w+")
sys.stdout = log_file
x = 5
y = 10

x, y = y, x
print("x =", x)
print("y =", y)
sys.stdout = old_stdout
log_file.close()
    