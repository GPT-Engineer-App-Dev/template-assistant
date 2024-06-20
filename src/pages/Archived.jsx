import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Archived = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Archived Products</CardTitle>
        <CardDescription>
          Manage your archived products and view their history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add code to display archived products here */}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

export default Archived;