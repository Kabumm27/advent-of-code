wires = {}
with open("input.txt") as file:
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


for (wire, data) in wires.items():
  if data['val'] == None:
    solve_wire(wire)


result_sum = 0
for (wire, data) in wires.items():
  if wire.startswith('z'):
    result_sum += data['val'] << int(wire[1:])

print(result_sum)
