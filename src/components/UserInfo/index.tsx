import React, { useEffect } from "react";
import { StoreState, User } from "../../redux/interfaces";
// import "../../styles/UserInfo.css";
import { fetchUsers, loadUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "../Filters";

export default function UserInfo(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadedUsers = useSelector((state: any) => {
    return state.usersState.users;
  });

  function putUserinState(cuil: number) {
    dispatch(loadUser(cuil) as any);
    navigate("/admin/updateuser");
  }
  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, []);

  const handleFilter = (e: string) => {
    setSearchParams({ filter: e });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th data-type="numeric">
              cuil <span className="resize-handle"></span>
            </th>
            <th data-type="any">
              boton <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Nombre <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Apellido <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Teléfono <span className="resize-handle"></span>
            </th>
            <th data-type="text-long">
              Cargo <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Dirección <span className="resize-handle"></span>
            </th>
            <th data-type="text-long">
              Correo Electronico <span className="resize-handle"></span>
            </th>
            <th data-type="text-short">
              Género<span className="resize-handle"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loadedUsers
            .filter((user: User) => {
              if (!filter) return true;
              const name = user.name.toLowerCase();
              return name.includes(filter.toLocaleLowerCase());
            })
            .map((e: any) => {
              return (
                <>
                  <tr>
                    <td>{e.cuil}</td>{" "}
                    <button
                      className="w-100"
                      onClick={() => putUserinState(e.cuil)}
                    >
                      Editar
                    </button>
                    <td>{e.name}</td>
                    <td>{e.lastName}</td>
                    <td>{e.phoneNumber}</td>
                    <td>{e.role}</td>
                    <td>{e.address}</td>
                    <td>{e.emailAddress}</td>
                    <td>{e.gender}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
