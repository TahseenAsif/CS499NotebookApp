
import sys
old_stdout = sys.stdout
log_file = open("message.txt", "w+")
sys.stdout = log_file
# Program to add two matrices using nested loop

X = [[12,7,3],
    [4 ,5,6],
    [7 ,8,9]

Y = [[5,8,1],
    [6,7,3]
    [4,5,9]]

result = [[0,0,0],
         [0,0,0],
         [0,0,0]]

# iterate through rows
for i in range(len(X))
   # iterate through columns
   for j in range(len(X[0])):
       result[i][p] = X[i][j] + Y[i][j]

for r in result:
   print(r)
sys.stdout = old_stdout
log_file.close()
    