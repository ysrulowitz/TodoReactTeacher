import db from "./db.js";

export const createTask = async (title, user_id) => {
  const result = await db.one(
    "insert into todoapp.task (title, user_id) values (${title}, ${user_id}) returning *",
    {
      title,
      user_id,
    }
  );
  return {
    title: result.title,
    done: false,
    id: result.id,
  };
};

export const getTasks = async (user_id) => {
  const result = await db.manyOrNone(
    "select * from todoapp.task where deleted_at is null and user_id = ${user_id}", { user_id }
  );

  return result.map((task) => ({
    id: task.id,
    title: task.title,
    done: task.status !== "active",
  }));
};

export const markTaskAsDone = async (taskId, userId) => {
  await db.none("update todoapp.task set status = 'done' where id = ${taskId} and user_id =${userId}", {
    taskId,
    userId,
  });
  return { ok: true };
};

export const deleteTask = async (taskId, userId) => {
  await db.none("update todoapp.task set deleted_at = now() where id = ${taskId} and user_id =${userId}", {
    taskId,
    userId,
    });
  return { ok: true };
};
