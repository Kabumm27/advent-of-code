import re

result_sum = 0
with open('input.txt', 'r') as file:
    for line in file:
        matches = re.findall("mul\([0-9]+,[0-9]+\)", line)
        for match in matches:
            numbers = [int(n) for n in match[4:-1].split(',')]
            result_sum += numbers[0] * numbers[1]

print(result_sum)
        