wires = {}
with open("input_copy.txt") as file:
  for line in file:
    if ':' in line:
      [wire, val] = [x.strip() for x in line.split(':')]
      wires[wire] = {
        'val': int(val),
        'src_a': None,
        'src_b': None,
        'op': None,
      }
    elif '->' in line:
      [opStr, wire] = [x.strip() for x in line.split('->')]
      if 'AND' in opStr:
        op = 'AND'
        [src_a, src_b] = [x.strip() for x in opStr.split('AND')]
      elif 'XOR' in opStr:
        op = 'XOR'
        [src_a, src_b] = [x.strip() for x in opStr.split('XOR')]
      elif 'OR' in opStr:
        op = 'OR'
        [src_a, src_b] = [x.strip() for x in opStr.split('OR')]

      wires[wire] = {
        'val': None,
        'src_a': src_a,
        'src_b': src_b,
        'op': op,
      }


def solve_wire(wire):
  data = wires[wire]
  val, src_a, src_b, op = data['val'], data['src_a'], data['src_b'], data['op']
  if val != None:
    return val
  else:
    if op == 'AND':
      wires[wire]['val'] = solve_wire(src_a) & solve_wire(src_b)
    elif op == 'OR':
      wires[wire]['val'] = solve_wire(src_a) | solve_wire(src_b)
    else:
      wires[wire]['val'] = solve_wire(src_a) ^ solve_wire(src_b)

  return wires[wire]['val']


def print_tree(wire):
  data = wires[wire]
  if not data['src_a']:
    return wire + ' (' + str(data['val']) + ')'
  else:
    return '(' + print_tree(data['src_a']) + ' ' + data['op'] + ' ' + print_tree(data['src_b']) +  ' (' + wire + ', ' + str(data['val']) + '))'


for (wire, data) in wires.items():
  if data['val'] == None:
    solve_wire(wire)


# for i in range(46):
#   wire = "z{:0>{}}".format(i, 2)
#   print(wire, '=', print_tree(wire))

print('z05', '=', print_tree('z05'))

# result_sum = 0
# for (wire, data) in wires.items():
#   if wire.startswith('x'):
#     result_sum += data['val'] << int(wire[1:])
# print("{0:b}".format(result_sum))

# result_sum = 0
# for (wire, data) in wires.items():
#   if wire.startswith('y'):
#     result_sum += data['val'] << int(wire[1:])
# print("{0:b}".format(result_sum))

# result_sum = 0
# for (wire, data) in wires.items():
#   if wire.startswith('z'):
#     result_sum += data['val'] << int(wire[1:])
# print("{0:b}".format(result_sum))

# Default puzzle input
# x: 24.408.943.247.053
# y: 23.256.441.849.881
# z: 47.666.458.872.582
# t: 47.665.385.096.934
# x: 0101100011001100100110011001000011111011001101
# y: 0101010010011011001111111101001000100000011001
# z: 1010110101101000110110010110010100101100000110
# t: 1010110101100111110110010110001100011011100110
#                ====             ==   == ====     


# All 1
# x: 0111111111111111111111111111111111111111111111
# y: 0111111111111111111111111111111111111111111111
# z: 1111111111111110111111111111111111101111111110
# t: 1111111111111111111111111111111111111111111110
#                   =                   =

# x: 000000000000000000000000000000000000000000000
# y: 111111111111111111111111111111111111111111111
# z: 111111111111111000000000000000000010000011111
# t: 111111111111111111111111111111111111111111111
#                   =================== =====

# x: 111111111111111111111111111111111111111111111
# y: 000000000000000000000000000000000000000000000
# z: 111111111111111000000000000000000010000011111
# t: 111111111111111111111111111111111111111111111
#                   =================== =====

# x: 001100000111000000110000110010011101000010000
# y: 011111000100101000110001110111001000101001110
# z: 101011001011110001100010101010100101101011110
# t: 101011001011101001100010101001100101101011110
#                 ==             ==        