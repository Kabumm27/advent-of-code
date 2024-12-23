image = []

with open('input.txt', 'r') as file:
    for line in file:
        image.append(list(line.strip()))

width = len(image[0])
height = len(image)

# for line in image:
#     print(''.join(line))

def dist(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])
                                  

def get_neighbours(pos):
    (y, x) = pos
    neighbours = [
        ((y - 1, x)), # top
        ((y, x + 1)), # right
        ((y + 1, x)), # bottom
        ((y, x - 1)), # left
    ]
    return [n if n[0] >= 0 and n[1] >= 0 and n[0] < height and n[1] < width else None for n in neighbours]


def flood_fill(pos, val):
    region = {}
    queue = [pos]

    while len(queue) != 0:
        (y, x) = queue.pop()
        region[y,x] = 1
        image[y][x] = '.'

        for neighbour in get_neighbours((y, x)):
            if neighbour:
                (y, x) = neighbour
                if image[y][x] == val:
                    queue.append(neighbour)

    # print(region)
    borders = 4
    border_top = []
    border_right = []
    border_bottom = []
    border_left = []
    
    for pos in region.keys():
        neighbours = get_neighbours(pos)
        # print(neighbours)
        if not (neighbours[0] and neighbours[0] in region):
            border_top.append(pos)
        if not (neighbours[1] and neighbours[1] in region):
            border_right.append(pos)
        if not (neighbours[2] and neighbours[2] in region):
            border_bottom.append(pos)
        if not (neighbours[3] and neighbours[3] in region):
            border_left.append(pos)
    
    border_top.sort()
    # print("Top:", border_top)
    border_right.sort(key=lambda k: (k[1], k[0]))
    # print("Right:", border_right)
    border_bottom.sort()
    # print("Bottom:", border_bottom)
    border_left.sort(key=lambda k: (k[1], k[0]))
    # print("Left:", border_left)

    for l in [border_top, border_right, border_bottom, border_left]:
        last_pos = l.pop()
        while len(l):
            current_pos = l.pop()
            if dist(last_pos, current_pos) != 1:
                borders += 1
            last_pos = current_pos

    # print(val, borders, borders * len(region))
    return borders * len(region)


result_sum = 0
for (y, row) in enumerate(image):
    for (x, pixel) in enumerate(row):
        if pixel != '.':
            result_sum += flood_fill((y, x), pixel)


print('Result: ', result_sum)
