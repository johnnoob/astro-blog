import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

type SidebarProps = {
  categoryCountMap: Map<string, number>;
  subcategoryCountMap: Map<string, number>;
  tagCountMap: Map<string, number>;
};

const Sidebar = ({
  categoryCountMap,
  subcategoryCountMap,
  tagCountMap,
}: SidebarProps) => {
  return (
    <Card>
      <CardHeader className="py-2">
        <CardTitle className="text-lg">貼文列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {Array.from(categoryCountMap.keys()).map((key) => (
            <a href={`/categories/${key}`} className="">
              {key}
              <Badge>{categoryCountMap.get(key)}</Badge>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function Component() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Sales</CardTitle>
//       </CardHeader>
//       <CardContent className="grid gap-8">
//         <div className="flex items-center gap-4">
//           <Avatar className="hidden h-9 w-9 sm:flex">
//             <AvatarImage src="/avatars/01.png" alt="Avatar" />
//             <AvatarFallback>OM</AvatarFallback>
//           </Avatar>
//           <div className="grid gap-1">
//             <p className="text-sm font-medium leading-none">Olivia Martin</p>
//             <p className="text-sm text-muted-foreground">
//               olivia.martin@email.com
//             </p>
//           </div>
//           <div className="ml-auto font-medium">+$1,999.00</div>
//         </div>
//         <div className="flex items-center gap-4">
//           <Avatar className="hidden h-9 w-9 sm:flex">
//             <AvatarImage src="/avatars/02.png" alt="Avatar" />
//             <AvatarFallback>JL</AvatarFallback>
//           </Avatar>
//           <div className="grid gap-1">
//             <p className="text-sm font-medium leading-none">Jackson Lee</p>
//             <p className="text-sm text-muted-foreground">
//               jackson.lee@email.com
//             </p>
//           </div>
//           <div className="ml-auto font-medium">+$39.00</div>
//         </div>
//         <div className="flex items-center gap-4">
//           <Avatar className="hidden h-9 w-9 sm:flex">
//             <AvatarImage src="/avatars/03.png" alt="Avatar" />
//             <AvatarFallback>IN</AvatarFallback>
//           </Avatar>
//           <div className="grid gap-1">
//             <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
//             <p className="text-sm text-muted-foreground">
//               isabella.nguyen@email.com
//             </p>
//           </div>
//           <div className="ml-auto font-medium">+$299.00</div>
//         </div>
//         <div className="flex items-center gap-4">
//           <Avatar className="hidden h-9 w-9 sm:flex">
//             <AvatarImage src="/avatars/04.png" alt="Avatar" />
//             <AvatarFallback>WK</AvatarFallback>
//           </Avatar>
//           <div className="grid gap-1">
//             <p className="text-sm font-medium leading-none">William Kim</p>
//             <p className="text-sm text-muted-foreground">will@email.com</p>
//           </div>
//           <div className="ml-auto font-medium">+$99.00</div>
//         </div>
//         <div className="flex items-center gap-4">
//           <Avatar className="hidden h-9 w-9 sm:flex">
//             <AvatarImage src="/avatars/05.png" alt="Avatar" />
//             <AvatarFallback>SD</AvatarFallback>
//           </Avatar>
//           <div className="grid gap-1">
//             <p className="text-sm font-medium leading-none">Sofia Davis</p>
//             <p className="text-sm text-muted-foreground">
//               sofia.davis@email.com
//             </p>
//           </div>
//           <div className="ml-auto font-medium">+$39.00</div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
