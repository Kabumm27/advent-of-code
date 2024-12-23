image = []

with open('input.txt', 'r') as file:
    for line in file:
        image.append(list(line.strip()))

width = len(image[0])
height = len(image)

# for line in image:
#     print(''.join(line))


def get_neighbours(pos):
    (y, x) = pos
    neighbours = [
        ((y - 1, x)),
        ((y + 1, x)),
        ((y, x - 1)),
        ((y, x + 1))
    ]
    return [n for n in neighbours if n[0] >= 0 and n[1] >= 0 and n[0] < width and n[1] < height]


def flood_fill(pos, val):
    region = {}
    queue = [pos]

    while len(queue) != 0:
        (y, x) = queue.pop()
        region[y,x] = 1
        image[y][x] = '.'

        for neighbour in get_neighbours((y, x)):
            (y, x) = neighbour
            if image[y][x] == val:
                queue.append(neighbour)

    # print(region)
    borders = 0
    for (y, x) in region.keys():
        neighbours = [n for n in get_neighbours((y, x)) if n in region]
        borders += 4 - len(neighbours)
    
    # print(borders, borders * len(region))
    return borders * len(region)

result_sum = 0
for (y, row) in enumerate(image):
    for (x, pixel) in enumerate(row):
        if pixel != '.':
            result_sum += flood_fill((y, x), pixel)
            

print('Result: ', result_sum)