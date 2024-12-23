def test_row(row, skip_count):
    deltas = []
    for i in range(len(row) - 1):
        deltas.append(row[i + 1] - row[i])

    is_increasing = [x > 0 and abs(x) <= 3 for x in deltas]
    is_decreasing = [x < 0 and abs(x) <= 3 for x in deltas]

    if all(is_increasing) or all(is_decreasing):
        return True

    if skip_count > 0:
        if is_increasing.count(False) == 1:
            index = is_increasing.index(False)
            for i in range(2):
                i += index
                if test_row(row[:i] + row[i + 1:], 0):
                    return True
        if is_decreasing.count(False) == 1:
            index = is_decreasing.index(False)
            for i in range(2):
                i += index
                if test_row(row[:i] + row[i + 1:], 0):
                    return True

    return False


result_sum = 0
with open('input.txt', 'r') as file:
    for line in file:
        row = [int(x) for x in line.split(' ')]
        if test_row(row, 1):
            print(row)
            result_sum += 1

print(result_sum)
