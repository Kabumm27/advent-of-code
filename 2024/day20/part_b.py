maze = []

start = (0, 0)
end = (0, 0)

with open('input.txt', 'r') as file:
    y = 0
    for line in file:
        maze += [list(line.strip())]
        start_index = line.find('S')
        if start_index != -1:
            start = [y, start_index]
        end_index = line.find('E')
        if end_index != -1:
            end = [y, end_index]
        y += 1


height = len(maze)
width = len(maze[0])
max_distance = 0

# print(start, end)
# for line in maze:
#     print(*line)


def calculate_dist_rec(coord, dist):
    global max_distance

    max_distance = dist
    (y, x) = coord
    maze[y][x] = dist
    
    for (n_x, n_y) in [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]:
        if n_y < 0 or n_y >= height or n_x < 0 or n_x >= width:
            continue
        if maze[n_y][n_x] == '.' or maze[n_y][n_x] == 'S' or maze[n_y][n_x] == 'E':
            calculate_dist_rec((n_y, n_x), dist + 1)


def calculate_distances(start):
    # calculate_dist_rec(start, 0)
    current_dist = 0
    next_neighbour = start
    while next_neighbour:
        (y, x) = next_neighbour
        maze[y][x] = current_dist
        current_dist += 1

        next_neighbour  = None
        for (n_x, n_y) in [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]:
            # if n_y < 0 or n_y >= height or n_x < 0 or n_x >= width:
            #     continue
            if maze[n_y][n_x] == '.' or maze[n_y][n_x] == 'S' or maze[n_y][n_x] == 'E':
                next_neighbour = (n_y, n_x)


calculate_distances(end)
# for line in maze:
#     print(line)

max_shortcut_dist = 6
def get_all_shortcuts_targets(start):
    neighbours = []
    for y_offset in range(-max_shortcut_dist, max_shortcut_dist + 1):
        for x_offset in range(-max_shortcut_dist, max_shortcut_dist + 1):
            y = start[0] + y_offset
            x = start[1] + x_offset
            if n_y < 0 or n_y >= height or n_x < 0 or n_x >= width:
                continue
            if y_offset + x_offset > max_shortcut_dist:
                continue
            if maze[n_y][n_x] == '.' or maze[n_y][n_x] == 'S' or maze[n_y][n_x] == 'E':
                delta = maze[n_y][n_x] - maze[y][x]
                neighbours.append((y, x,  delta - (y_offset + x_offset)))
    print(neighbours)
    return neighbours


distance_map = {}
for y in range(1, height - 1):
    for x in range(1, width - 1):
        if maze[y][x] != '#':
            neighbours = []
            for (n_x, n_y) in [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]:
                if maze[n_y][n_x] != '#':
                    neighbours.append(maze[n_y][n_x])
            if len(neighbours) >= 2:
                # print("Coord:", (y, x))
                # print(neighbours)
                delta = max(neighbours) - min(neighbours) - 2
                if delta > 0:
                    if delta not in distance_map:
                        distance_map[delta] = 1
                    else:
                        distance_map[delta] += 1


result_sum = 0
keys = sorted([x for x in distance_map.keys()])
for key in keys:
    # print(key, distance_map[key])
    if key >= 100:
        result_sum += distance_map[key]

print(result_sum)
