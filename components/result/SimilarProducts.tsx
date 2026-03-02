"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { SimilarProduct } from "@/types";

type SimilarProductsProps = {
  products: SimilarProduct[];
};

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Similar Products Found</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-start gap-3 rounded-lg border border-border p-3"
          >
            {product.favicon ? (
              <img
                src={product.favicon}
                alt=""
                className="mt-0.5 h-5 w-5 rounded"
                loading="lazy"
              />
            ) : (
              <div className="mt-0.5 h-5 w-5 rounded bg-muted" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{product.name}</span>
                {product.url && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <Badge variant="outline" className="ml-auto text-xs">
                  {product.confidence}% match
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.reason}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
