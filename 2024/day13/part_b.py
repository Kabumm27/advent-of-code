import re


machines = []
with open('input_sample.txt', 'r') as file:
    current_machine = {}
    for line in file:
        line = line.strip()
        if line:
            if 'Button A' in line:
                regex_matches = re.search(r"X\+(\d+).+Y\+(\d+)", line)
                current_machine['btnA'] = [int(n) for n in regex_matches.groups()]
            elif 'Button B' in line:
                regex_matches = re.search(r"X\+(\d+).+Y\+(\d+)", line)
                current_machine['btnB'] = [int(n) for n in regex_matches.groups()]
            elif 'Prize' in line:
                regex_matches = re.search(r"X=(\d+).+Y=(\d+)", line)
                current_machine['prize'] = [int(n) + 10000000000000 for n in regex_matches.groups()]
                machines.append(current_machine)
                current_machine = {}

result_sum = 0
for machine in machines:
    btnA = machine['btnA']
    btnB = machine['btnB']
    prize = machine['prize']

    multiplierA = 0
    multiplierB_start = min(int(prize[0] / btnB[0]), int(prize[1] / btnB[1]))
    # print(multiplierB)
    for i in range(multiplierB_start + 1):
        multiplierB = multiplierB_start - i
        print("B:", multiplierA, multiplierB)
        while btnA[0] * multiplierA + btnB[0] * multiplierB < prize[0] and btnA[1] * multiplierA + btnB[1] * multiplierB < prize[1]:
            # print(prize[0] - btnB[0] * multiplierB, prize[1] - btnB[1] * multiplierB)
            multiplierA += 1
            print("A:", multiplierA, multiplierB)
        # print([btnA[0] * multiplierA + btnB[0] * multiplierB, btnA[1] * multiplierA + btnB[1] * multiplierB])
        if prize == [btnA[0] * multiplierA + btnB[0] * multiplierB, btnA[1] * multiplierA + btnB[1] * multiplierB]:
            # print(multiplierA, multiplierB)
            result_sum += multiplierA * 3 + multiplierB
            break

print(result_sum)
