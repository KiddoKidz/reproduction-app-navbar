import clsx from "clsx";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

const navBarItems = [
  {
    name: "A",
    path: "/",
    isDisabled: true,
    subItem: [
    ],
  },
  
  {
    name: "B",
    path: "/b",
    subItem: [
      {
        name: "C",
        path: "/c",
        subItem: [
          {
            name: "D",
            path: "/",
          },
          {
            name: "E",
            path: "/e",
          },
          {
            name: "F",
            path: "/f",
          },
        ],
      },
    ],
  },
  {
    name: "G",
    path: "/",
    isDisabled: true,
    subItem: [
    ],
  },
  {
    name: "H",
    path: "/h",
    subItem: [
      {
        name: "I",
        path: "/i",
        subItem: [
          {
            name: "J",
            path: "/j",
          },
          {
            name: "N",
            path: "/n",
          },
        ],
      },
    ],
  },
];

type NavBarItem = typeof navBarItems;

function generateNavBarItem(navBarItems: NavBarItem) {
  return (
    <>
      {navBarItems.map((navBarItem) => {
        if (navBarItem.subItem && navBarItem.subItem.length > 0) {
          return (
            <li className={clsx(navBarItem.isDisabled && "disabled")}>
              <details>
                <summary className="menu-summary">{navBarItem.name}</summary>
                {Boolean(navBarItem.subItem.length) && (
                  <ul className="p-2 bg-base-100">
                    {navBarItem.subItem.map((subItem) => {
                      return (
                        <li>
                          {subItem.subItem ? (
                            <details>
                              <summary className="menu-summary">
                                {subItem.name}
                              </summary>
                              <ul>
                                {subItem.subItem.map((subSubItem) => {
                                  return (
                                    <li>
                                      <Link
                                        href={`${navBarItem.path}${subItem.path}${subSubItem.path}`}
                                      >
                                        {subSubItem.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </details>
                          ) : (
                            <Link href={`${navBarItem.path}${subItem.path}`}>
                              {subItem.name}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </details>
            </li>
          );
        } else {
          return (
            <li className={clsx(navBarItem.isDisabled && "disabled")}>
              <Link href={navBarItem.path}>{navBarItem.name}</Link>
            </li>
          );
        }
      })}
    </>
  );
}

export default function NavBar() {
  const router = useRouter();

  useEffect(() => {
    const resetMenuState = () => {
      const navbarElement = document.getElementById("navbar");
      const detailsElementsOnNavbar =
        navbarElement?.getElementsByTagName("details");

      if (detailsElementsOnNavbar != undefined) {
        for (let index = 0; index < detailsElementsOnNavbar.length; index++) {
          const detailsElement = detailsElementsOnNavbar[index];
          detailsElement.removeAttribute("open");
        }
      }
    };

    router.events.on("routeChangeComplete", resetMenuState);
  }, [router]);

  return (
    <div id="navbar" className="navbar bg-base-200">
      <div className="">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">

          </label>
          <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-20">
            {generateNavBarItem(navBarItems)}
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          TEST
        </Link>
      </div>
      <div className="navbar-end hidden w-full max-w-full lg:flex">
        <ul className="menu menu-horizontal px-1 z-20">
          {generateNavBarItem(navBarItems)}
        </ul>
      </div>
    </div>
  );
}
