import re

text = ''
with open('input.txt', 'r') as file:
    for line in file:
        text += line
        
lines = text.split('don\'t()')
enabled_text = lines[0]
for line in lines[1:]:
    i = line.find('do()')
    if i >= 0:
       enabled_text += line[i:]

result_sum = 0
matches = re.findall("mul\([0-9]+,[0-9]+\)", enabled_text)
for match in matches:
    numbers = [int(n) for n in match[4:-1].split(',')]
    result_sum += numbers[0] * numbers[1]

print(result_sum)
        