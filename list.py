import random  
num = 20
start = 1
end = 20
arr = [] 
for j in range(num):
    arr.append(random.randint(start, end)) 
print(arr)

maximum = arr[0]
for i in range (0,len(arr)):
    if arr[i] > maximum:
        maximum = arr[i];

print(maximum);
sum = 0;
average = 0;
for i in range(0,len(arr)):
    sum += arr[i]
    average = sum /len(arr)
print(average);

mini = arr[0]
for i in range (0,len(arr)):
    if arr[i] < mini:
        mini = arr[i];

print(mini);
   
