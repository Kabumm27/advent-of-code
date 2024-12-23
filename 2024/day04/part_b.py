import math

width = 0
height = 0

base_array = []

with open('input.txt', 'r') as file:
    for line in file:
        base_array.append(line.strip())

    width = len(base_array[0])
    height = len(base_array)


filter = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
]

def check_filter(arr, filter, y, x):
    filter_size = len(filter)
    filter_size_half = math.floor(len(filter) / 2)

    tmp_str = ''
    for i in range(filter_size):
        for j in range(filter_size):
            if filter[i][j] == 0:
                continue

            f_x = x + j - filter_size_half
            f_y = y + i - filter_size_half

            if f_x < 0 or f_x >= width:
                return None
            if f_y < 0 or f_y >= height:
                return None

            tmp_str += arr[f_y][f_x]

    return tmp_str


counter = 0
for y in range(height):
    for x in range(width):
        search_str = check_filter(base_array, filter, y, x)
        if search_str is not None:
            counter += search_str.count('MSAMS')
            counter += search_str.count('SSAMM')
            counter += search_str.count('MMASS')
            counter += search_str.count('SMASM')
        
print(counter)
