import Image from "next/image";
import { useState, useEffect } from "react";

export default function CC_buttons() {
  const rank = [1, 2, 3];
  let ccConfig = require("../cc_config/cc6-perma.json");
  const [selected, setSelected] = useState([
    { category: "", selected: false, option: "" },
  ]);

  useEffect(() => {
    const categoryArr = [];
    for (const category of ccConfig) {
      if (!categoryArr.includes(category.category)) {
        categoryArr.push(category.category);
      }
    }
    setSelected(
      categoryArr.map((ele) => {
        return { category: ele, selected: false, option: "" };
      })
    );
  }, []);

  const handleClick = (category, name) => {
    //   console.log("name",name)
    //   console.log("category", category)
    //   console.log(selected)
    const categoryIndex = -1;
    for (let i = 0; i < selected.length; i++) {
      //check if button has been selected before
      if (selected[i].category === category) {
        categoryIndex = i;
      }
      if (selected[i].option === name) {
        setSelected(
          selected.map((item, index) => {
            if (index === i) {
              return { category: item.category, selected: false, option: "" };
            } else {
              return item;
            }
          })
        );
        return;
      }
    }
    // if button has not been selected before
    // console.log("here")
    setSelected(
      selected.map((item, index) => {
        if (index === categoryIndex) {
          return { category: item.category, selected: true, option: name };
        } else {
          return item;
        }
      })
    );
  };

  const toggleOptionColor = (category, name) => {
    for (const item of selected) {
      if (item.category === category) {
        if (item.option === name) {
          return "bg-blue-500";
        } else if (item.selected) {
          return "bg-rose-600";
        } else {
          return "";
        }
      }
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gray-500"
      case 2:
        return "bg-gray-800"
      case 3:
        return "bg-red-800"
    }
  };

  return (
    <>
      <div className="flex flex-wrap flex-col w-full h-[150px] min-w-[900px]">
        {rank.map((num) => (
          <div
            className="border min-w-[50px] max-w-[60px] min-h-[50px] flex items-center"
            key={`rank${num}`}
          >
            <Image
              src={`/images/cc_buttons/rank${num}.png`}
              alt={`rank${num}`}
              width="65px"
              height="29px"
              className="overflow-hidden"
            />
          </div>
        ))}
        {ccConfig.map((category) =>
          category[`options`].map((option) => (
            <div className={`border w-[50px] h-[50px] ${getRankColor(option.rank)}`}>
              {Object.keys(option).includes("img") ? (
                <button
                  onClick={() => handleClick(category.category, option.img)}
                >
                  <Image
                    src={`/images/cc_buttons/${option.img}.png`}
                    alt={`${option.tooltip_en}`}
                    width="50px"
                    height="50px"
                    className={`${toggleOptionColor(
                      category.category,
                      option.img
                    )}`}
                  />{" "}
                </button>
              ) : null}
            </div>
          ))
        )}
      </div>
    </>
  );
}
