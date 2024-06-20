import { useState, useEffect } from "react";
import {
  File,
  ListFilter,
  PlusCircle,
  MoreVertical,
  Edit,
  Trash,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";

import { useNotes, useAddNote, useUpdateNote, useDeleteNote } from "@/integrations/supabase/index.js";

const Index = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const { data: notes, isLoading, isError } = useNotes();
  const addNote = useAddNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsEditModalOpen(true);
  };

  const onSubmit = (data) => {
    addNote.mutate(data);
    reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading notes</div>;
  }

  const pinnedNotes = notes.filter(note => note.pinned);
  const notPinnedNotes = notes.filter(note => !note.pinned);

  return (
    <div className="p-4">
      <Tabs defaultValue="pinned">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="pinned">Pinned</TabsTrigger>
            <TabsTrigger value="not-pinned">Not Pinned</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Pinned
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Not Pinned</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Note
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Note</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...register("title")} />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Input id="content" {...register("content")} />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input id="color" {...register("color")} />
                  </div>
                  <div>
                    <Label htmlFor="pinned">Pinned</Label>
                    <Select {...register("pinned")} onValueChange={(value) => setValue("pinned", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit">Add Note</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <TabsContent value="pinned">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Pinned Notes</CardTitle>
              <CardDescription>
                Manage your pinned notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Pinned</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pinnedNotes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell>{note.title}</TableCell>
                      <TableCell>{note.content}</TableCell>
                      <TableCell>{note.color}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{note.pinned ? "Yes" : "No"}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditNote(note)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteNote.mutate(note.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>{pinnedNotes.length}</strong> notes
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="not-pinned">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Not Pinned Notes</CardTitle>
              <CardDescription>
                Manage your not pinned notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Pinned</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notPinnedNotes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell>{note.title}</TableCell>
                      <TableCell>{note.content}</TableCell>
                      <TableCell>{note.color}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{note.pinned ? "Yes" : "No"}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditNote(note)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteNote.mutate(note.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>{notPinnedNotes.length}</strong> notes
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit((data) => {
            updateNote.mutate({ ...currentNote, ...data });
            setIsEditModalOpen(false);
          })} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={currentNote?.title} {...register("title")} />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Input id="content" defaultValue={currentNote?.content} {...register("content")} />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input id="color" defaultValue={currentNote?.color} {...register("color")} />
            </div>
            <div>
              <Label htmlFor="pinned">Pinned</Label>
              <Select defaultValue={currentNote?.pinned ? "true" : "false"} {...register("pinned")} onValueChange={(value) => setValue("pinned", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;