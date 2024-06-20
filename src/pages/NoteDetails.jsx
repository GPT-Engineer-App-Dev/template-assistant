import React from 'react';
import { useParams } from 'react-router-dom';
import { useNote } from '@/integrations/supabase/index.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NoteDetails = () => {
  const { id } = useParams();
  const { data: note, isLoading, isError } = useNote(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading note details</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>
          <Badge variant="outline">{note.pinned ? "Pinned" : "Not Pinned"}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{note.content}</p>
        <p>Color: {note.color}</p>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Created at: <strong>{new Date(note.created_at).toLocaleString()}</strong>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteDetails;