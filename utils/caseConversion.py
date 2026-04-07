hardWords = [
    "Air Guitar",
    "Airplane",
    "Alarm Clock",
    "Alien",
    "Breakdancing",
    "Clapping",
    "Climbing",
    "Clock",
    "Elephant",
    "Escalator",
    "Excited",
    "Exercise",
    "Falling",
    "Fan",
    "Farmer",
    "Fast",
    "Feeding",
    "Finger Painting",
    "Firefighter",
]

words = set([word.title() for word in hardWords])

sorted_hardWords = sorted(words)

for word in sorted_hardWords:
    print(f"\"{word.title()}\",")