rows = []

with open('input.txt', 'r') as file:
    for line in file:
        row = [int(x) for x in line.split(' ')]
        rows.append(row)

result_sum = 0
for row in rows:
    deltas = []
    for i in range(len(row) - 1):
        deltas.append(row[i + 1] - row[i])

    is_increasing = all([x > 0 and abs(x) <= 3 for x in deltas])
    is_decreasing = all([x < 0 and abs(x) <= 3 for x in deltas])

    if is_increasing or is_decreasing:
        result_sum += 1

print(result_sum)