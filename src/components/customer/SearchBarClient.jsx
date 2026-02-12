"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { MdSearch } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchBarClient({ action, items = []  }) {
  const searchParams = useSearchParams();
  const urlQ = (searchParams.get("q") ?? "").toString();
  console.log(items);

  const [q, setQ] = useState(urlQ);

  const formRef = useRef(null);
  const hiddenRef = useRef(null);

  useEffect(() => {
    setQ(urlQ);
    if (hiddenRef.current) hiddenRef.current.value = urlQ;
  }, [urlQ]);

  const handleSelectionChange = (key) => {
    if (!key) return;
    const selected = items.find((p) => String(p.id) === String(key));
    if (!selected) return;

    setQ(selected.title);
    if (hiddenRef.current) hiddenRef.current.value = selected.title;

    formRef.current?.requestSubmit();
  };

  return (
    <form
      ref={formRef}
      action={action}
      className="flex focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
    >
      <input ref={hiddenRef} type="hidden" name="q" value={q} />

      <div className="w-full">
        <Autocomplete
          defaultItems={items}
          inputValue={q}
          onInputChange={(val) => {
            setQ(val);
            if (hiddenRef.current) hiddenRef.current.value = val;
          }}
          onSelectionChange={handleSelectionChange}
          allowsCustomValue
          selectorIcon={null}
          radius="none"
          isClearable={false}
        >
          {(item) => (
            <AutocompleteItem startContent={<MdSearch />} key={item.id}>
              {item.title}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>

      <button
        type="submit"
        className="h-10 px-4 w-12 max-w-12 bg-gray-300 hover:bg-gray-400 cursor-pointer"
        aria-label="Search"
      >
        <MdSearch />
      </button>
    </form>
  );
}
