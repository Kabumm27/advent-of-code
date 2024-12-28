rows = []

with open("input.txt", "r") as file:
    for line in file:
        row = [int(x) for x in line.split(" ")]
        rows.append(row)


def check_row(row):
    deltas = []
    for i in range(len(row) - 1):
        deltas.append(row[i + 1] - row[i])

    is_increasing = all([x > 0 and abs(x) <= 3 for x in deltas])
    is_decreasing = all([x < 0 and abs(x) <= 3 for x in deltas])

    if is_increasing or is_decreasing:
        return True
    return False


result_sum = 0
for row in rows:
    if check_row(row):
        result_sum += 1
    else:
        for i in range(len(row)):
            cleaned_row = row[:i] + row[i + 1 :]
            if check_row(cleaned_row):
                result_sum += 1
                break


print(result_sum)
