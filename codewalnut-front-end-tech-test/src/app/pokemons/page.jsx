"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

function Poki() {
  const limit = 20;
  const url = (offset = 0) =>
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;

  const [pokiData, setPokiData] = useState({ data: [], loading: false });
  const [pokiSearch, setPokiSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState({
    page_no: 1,
    prev: null,
    next: url(),
  });

  const router = useRouter();

  const handlePageChange = (e, val) => {
    let next_offset = (val - 1) * limit;
    let prev_offset = (val - 2) * limit;
    setPage({ prev: url(prev_offset), next: url(next_offset), page_no: val });
    setPokiData({ data: [], loading: true });
  };

  const calculatePageCount = (totalPokemon, limit = 20) => {
    let total_pages = Math.floor(Math.round(totalPokemon / limit));
    let extra = totalPokemon % limit;

    if (extra > 0) {
      total_pages = total_pages + 1;
    }
    return total_pages;
  };

  useEffect(() => {
    setPokiData({ data: [], loading: true });
    axios
      .get(page.next)
      .then((res) => {
        let totalPokemonCount = res.data.count;
        const total_pages = calculatePageCount(totalPokemonCount);
        setTotalPages(total_pages);
        setPage((prev) => ({
          ...prev,
          prev: res.data.prev,
          next: res.data.next,
        }));

        let allPokiData = [];
        res.data.results.forEach((each) => {
          axios
            .get(each.url)
            .then((response) => {
              let data = response.data;
              let pokiDetails = {
                name: data.name,
                id: data.id,
                type: data.types[0].type.name,
                exp: data.base_experience,
                species: data.species.name,
                stats: data.stats,
                abilities: data.abilities,
                image: data.sprites.front_default,
              };
              allPokiData.push(pokiDetails);
              if (
                res.data.results[res.data.results.length - 1].name === data.name
              ) {
                setPokiData({ data: [...allPokiData], loading: false });
              }
            })
            .catch((err) => {
              console.log(err);
              setPokiData({ data: [], loading: false });
            });
        });
      })
      .catch((err) => {
        console.log(err);
        setPokiData({ data: [], loading: false });
      });
  }, [page.page_no]);

  return (
    <>
      {!pokiData?.loading && pokiData.data?.length > 0 && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter pokemon name or id"
            value={pokiSearch}
            onChange={(e) => {
              setPokiSearch(e.target.value);
            }}
            className="input"
          />
          <button
            className="btn"
            onClick={() => {
              router.push(`pokemons/${pokiSearch}`);
            }}
          >
            Search
          </button>
        </div>
      )}
      {pokiData?.loading ? (
        <CircularProgress />
      ) : !pokiData.loading && pokiData?.data?.length > 0 ? (
        <div className="card-container">
          {pokiData.data.map((each) => (
            <Link href={`/pokemons/${each.id}`} id={each.id}>
              <Card
                name={each.name}
                id={each.id}
                type={each.type}
                exp={each.exp}
                species={each.species}
                url={each.image}
                stats={each.stats}
                abilities={each.abilities}
              />
            </Link>
          ))}
        </div>
      ) : (
        <CircularProgress />
      )}
      {!pokiData.loading && pokiData.data.length > 0 && (
        <div className="page-container">
          <Pagination
            size="small"
            count={totalPages}
            onChange={handlePageChange}
            page={page.page_no}
          />
        </div>
      )}
    </>
  );
}

export default Poki;
