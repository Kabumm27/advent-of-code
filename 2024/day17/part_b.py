#Register A: 33024962
#Register B: 0
#Register C: 0

#Program: 2,4, 1,3, 7,5, 1,5, 0,3, 4,2, 5,5, 3,0


def optimized_code(a):
    out = []

    while a > 0:
        b = a & 7
        c = a >> (b ^ 3)
        out.append(b ^ 6 ^ c & 7)
        a = a >> 3

    return out

expected_out = [2,4, 1,3, 7,5, 1,5, 0,3, 4,2, 5,5, 3,0]
results = []

def reverse_code(a, out_length):
    if len(optimized_code(a)) > 16:
        return

    for n in range(8):
        if optimized_code(a + n) == expected_out[-out_length:]:
            print(optimized_code(a + n))
            if out_length < len(expected_out):
                reverse_code((a + n) << 3, out_length + 1)
            else:
                results.append(a + n)

reverse_code(0, 1)
print("Results:", results)
print("")
print('Lowest Result:', min(results))
print(optimized_code(min(results)))
