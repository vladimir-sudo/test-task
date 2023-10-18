export type DepartmentType = {
  name: string;
  props: {
    id: string;
    name: string;
  };
};

export type StatementType = {
  name: string;
  props: {
    id: string;
    date: string;
    amount: string;
  };
};

export type SalaryType = {
  name: string;
  children: Array<StatementType>;
};

export type DonationType = StatementType & {
  props: {
    sign: string;
  };
};

export type EmployeeType = {
  name: string;
  props: {
    id: string;
    name: string;
    surname: string;
  };
  children: Array<DepartmentType | DonationType | SalaryType>;
};
