left = []
right = dict()

with open('input.txt', 'r') as file:
    for line in file:
        [l, r] = line.split('   ')
        left.append(int(l))
        if int(r) not in right:
            right[int(r)] = 1
        else:
            right[int(r)] += 1

sum = 0
for l in left:
    if l in right:
        sum += l * right[l]

print(sum)
