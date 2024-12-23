left = []
right = []

with open('input.txt', 'r') as file:
    for line in file:
        [l, r] = line.split('   ')
        left.append(int(l))
        right.append(int(r))

left.sort()
right.sort()

delta_sum = 0
for (l, r) in zip(left, right):
    delta = abs(l - r)
    delta_sum += delta

print(delta_sum)
