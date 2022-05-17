import React, { useEffect } from "react";
import { StoreState, User } from "../../redux/interfaces";
import "../../styles/UserList.css";
import { fetchUsers, loadUser, loadUserSalary } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "../Filters";

export default function UserList(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadedUsers = useSelector((state: any) => {
    return state.usersState.users;
  });

  function putUserinState(cuil: number) {
    dispatch(loadUser(cuil) as any);
    navigate("/admin/userlist/" + cuil);
  }

  function putUserinStateSalary(cuil: number) {
    dispatch(loadUserSalary(cuil) as any);
    navigate("/admin/salary/" + cuil);
  }

  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, []);

  const handleFilter = (e: string) => {
    setSearchParams({ filter: e });
  };

  return (
    <div className="userlist-filter-container">
      <div className="na-title">
        <h1>Listado de usuarios</h1>
      </div>
      <Filters />
      <div className="userlist-search-container">
        <h4>Busqueda por nombre</h4>
        <input
          className="form-control"
          type="text"
          value={filter}
          placeholder="Buscar"
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th data-type="numeric">
              cuil <span className="resize-handle"></span>
            </th>
            <th data-type="any">
              Detalles <span className="resize-handle"></span>
            </th>
            <th data-type="any">
              Salario <span className="resize-handle"></span>
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
              Rol <span className="resize-handle"></span>
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
              const Fullname =
                user.name.toLowerCase() + " " + user.lastName.toLowerCase();
              const ReverseFullname =
                user.lastName.toLowerCase() + " " + user.name.toLowerCase();
              return Fullname.includes(filter.toLocaleLowerCase())
                ? user
                : ReverseFullname.includes(filter.toLocaleLowerCase())
                ? user
                : false;
            })
            .map((e: any) => {
              return (
                <>
                  <tr>
                    <td>{e.cuil}</td>{" "}
                    <td>
                      <button
                        id="userlist-button"
                        onClick={() => putUserinState(e.cuil)}
                      >
                        Detalles
                      </button>
                    </td>
                    <td>
                      <button
                        id="userlist-button"
                        onClick={() => putUserinStateSalary(e.cuil)}
                      >
                        Salario
                      </button>
                    </td>
                    <td>{e.name}</td>
                    <td>{e.lastName}</td>
                    <td>{e.phoneNumber}</td>
                    <td>{e.role}</td>
                    <td>{e.address}</td>
                    <td>{e.emailAddress}</td>
                    <td>{e.gender}</td>
                    <td>{e.jobs}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
