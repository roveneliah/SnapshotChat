import { useState } from 'react'
import { Listbox } from '@headlessui/react'

export function ChoiceList({ choices }) {
  const [selectedChoice, setSelectedChoice] = useState(choices[0])

  return (
    <Listbox value={selectedChoice} onChange={setSelectedChoice}>
      <Listbox.Button>{selectedChoice}</Listbox.Button>
      <Listbox.Options>
        {choices.map((choice) => (
          <Listbox.Option>
            {choice}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}