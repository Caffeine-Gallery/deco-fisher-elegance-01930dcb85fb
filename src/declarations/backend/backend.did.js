export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Contact = IDL.Record({
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : Time,
  });
  return IDL.Service({
    'getContacts' : IDL.Func([], [IDL.Vec(Contact)], ['query']),
    'submitContact' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
