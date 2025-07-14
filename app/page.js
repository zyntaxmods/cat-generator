"use client";

import { Raleway } from "next/font/google";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function page(){
	const [cat, setCat] = useState(null);
	let [name, setName] = useState("");
	let [size, setSize] = useState("");
	let [color, setColor] = useState("");
	let [load, setLoad] = useState(false);

		const getCat = async (name, size, color) =>{
			if(!name || !size || !color){
				Swal.fire({
					icon: "error",
					title: "Missing parameters",
					timer: 1000,
					showConfirmButton: false
				})
			}
			else{
			setLoad(true);
		try {
			const url = `https://cataas.com/cat/says/${name}?fontSize=${size}&fontColor=${color}`;
			const res = await fetch(url);
			const data = await res.blob();
			const raw = URL.createObjectURL(data);
			setCat(raw);
			setLoad(false);
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Something went wrong",
				text: `Error: ${error.message}`
			})
			setLoad(false)
		}
	}
	}
	const downloadCat = async() =>{
		const link = document.createElement("a");
		link.href = cat;
		link.download = `${name}.png`;
		link.click();
		Swal.fire({
			icon: "success",
			title: "Downloaded",
			showConfirmButton: false
		})
	}
	return (
    <div className="flex justify-center items-center m-[50px_auto]">
      <div className="flex flex-col rounded-3xl justify-center gap-4 p-2 items-center border border-white w-[300px] h-auto shadow-[0px_0px_3px_white]">
        <h1 className="uppercase">Generate a Random Cat</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter cat name"
        />
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Enter text size"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Enter text color"
        />
        <button
          className={load ? "pointer-events-none" : "pointer-events-auto"}
          onClick={() => getCat(name, size, color)}
        >
          {load ? "Generating" : "Generate"}
        </button>
        <br />
        {!cat ? null : (
          <div className="flex flex-col gap-5 justify-center items-center">
            <span className="font-bold">Preview:</span>
              <img
                src={cat}
                alt={name}
                className="rounded-2xl opacity-100 transition-all"
              />
              <button onClick={() => downloadCat()}>Download Image</button>
          </div>
        )}
      </div>
    </div>
  );
}