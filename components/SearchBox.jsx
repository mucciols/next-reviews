'use client';
import { Combobox } from "@headlessui/react";
import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <Combobox value={query} onChange={setQuery}>
      <Combobox.Input placeholder="Search..." />
    </Combobox>
  );
}
