import React, { useContext, useState } from "react";

import { HouseContext } from "./HouseContextProvider";

import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { Menu } from "@headlessui/react";

const CountryDropdown = () => {
  const { setCountry, country, countries } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">{country}</div>
          <div className="text-[13px]"> Select your place</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {countries.map((country, index) => {
          return (
            <Menu.Item
              as="li"
              key={index}
              onClick={() => setCountry(country)}
              className="cursor-pointer transition hover:text-violet-700"
            >
              {country}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default CountryDropdown;
//dropdown,dropdown-btn,dropdown-icon-primary,dropdown-icon-secondary,dropdown-menu
