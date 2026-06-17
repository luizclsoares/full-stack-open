import { useUsers, useUsersActions } from "../store";
import { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const Users = () => {
  const { initialize } = useUsersActions();
  const users = useUsers();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <p>
                  <b>Name</b>
                </p>
              </TableCell>
              <TableCell>
                <p>
                  <b>Username</b>
                </p>
              </TableCell>
              <TableCell>
                <p>
                  <b>Blogs Created</b>
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
