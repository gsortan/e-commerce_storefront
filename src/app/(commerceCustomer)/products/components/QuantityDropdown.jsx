import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function QuantityDropdown({value,onChange}) {

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-32 items-center justify-between rounded border bg-white px-3 py-2 text-sm shadow-sm">
        Qty: {value}
        <span className="ml-2">▾</span>
      </MenuButton>

      <MenuItems className="absolute left-0 mt-2 w-32 rounded border bg-white shadow-lg z-50 max-h-28 overflow-y-auto focus:outline-none">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
          <MenuItem key={n}>
            {({ focus }) => (
              <button
                type="button"
                onClick={() => onChange(n)}
                className={`w-full px-3 py-2 text-left text-sm ${
                  focus ? "bg-gray-100" : ""
                }`}
              >
                {n}
              </button>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
