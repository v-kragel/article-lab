import { useEffect } from "react";

import { useGetFieldsQuery } from "@/entities/field";

export const FieldsPage: React.FC = () => {
  const { data: fields } = useGetFieldsQuery();

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return <div>Fields Page</div>;
};
