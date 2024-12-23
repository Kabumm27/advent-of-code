from a_star import astar

ram = []
with open('input.txt', 'r') as file:
    for line in file:
        numbers = line.strip().split(',')
        ram.append((int(numbers[0]), int(numbers[1])))


width = 71
height = 71

# Create grid
grid = []
for y in range(height):
    row = []
    for x in range(width):
        row.append(0)
    grid.append(row)


for (i, byte) in enumerate(ram):
    if i >= 1024:
        break
    (y, x) = byte
    grid[y][x] = 1


path = astar(grid, (0, 0), (height - 1, width - 1))
print(len(path) - 1)

for (y, row) in enumerate(grid):
    line = ''
    for (x, ch) in enumerate(row):
        if (y, x) in path:
            line += 'o'
        else:
            line += '.' if ch == 0 else ';'
    print(line)
